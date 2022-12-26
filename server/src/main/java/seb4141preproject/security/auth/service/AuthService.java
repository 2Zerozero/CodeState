package seb4141preproject.security.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import seb4141preproject.members.mapper.MemberMapper;
import seb4141preproject.members.repository.MemberRepository;
import seb4141preproject.security.auth.provider.*;
import seb4141preproject.security.auth.dto.*;
import seb4141preproject.security.auth.entity.*;
import seb4141preproject.security.auth.repository.RefreshTokenRepository;

import javax.servlet.http.Cookie;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberMapper mapper;

    public TokenDto login(LoginDto loginDto) {
        // 1. loginDto 기반 authenticationToken 생성 (toAuthentication 메소드 활용)
        UsernamePasswordAuthenticationToken authenticationToken = loginDto.toAuthentication();

        // 2. token 검증
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = createToken(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        return tokenDto;
    }

    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        // 1. Refresh Token 검증
        if (!jwtTokenizer.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 인증정보 가져오기
        Authentication authentication = jwtTokenizer.getAuthentication(tokenRequestDto.getAccessToken());

        // 3. 저장소에서 User ID(email) 를 기반으로 Refresh Token 값 가져옴
        RefreshToken refreshToken =
                refreshTokenRepository.findByKey(authentication.getName())
                        .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. 유저의 Refresh Token 과 저장된 Refresh Token 이 일치하는지 검사
        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = createToken(authentication);

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return tokenDto;
    }

    public void logout(TokenRequestDto tokenRequestDto) {
        // TODO: 사용된 Access Token 사용하지 못하게 처리

        System.out.println(tokenRequestDto.getRefreshToken());

        // Refresh token 제거
        RefreshToken refreshToken = refreshTokenRepository.findByValue(tokenRequestDto.getRefreshToken())
                .orElseThrow(() -> new RuntimeException("REFRESH_TOKEN_NOT_FOUND"));

        refreshTokenRepository.delete(refreshToken);
    }

    // refresh token Cookie 생성 로직
    public Cookie createCookie(TokenDto tokenDto) {
        Cookie cookie = new Cookie("refresh-token", tokenDto.getRefreshToken());
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }

    // 클래스 내부에서만 사용 가능한 토큰 생성하는 로직
    private TokenDto createToken(Authentication authentication) {
        String accessToken = jwtTokenizer.generateAccessToken(authentication);
        String refreshToken = jwtTokenizer.generateRefreshToken(authentication);
        TokenDto tokenDto = new TokenDto(accessToken, refreshToken);
        return tokenDto;
    }
}

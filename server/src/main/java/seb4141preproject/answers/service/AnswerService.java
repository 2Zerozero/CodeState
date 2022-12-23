package seb4141preproject.answers.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import seb4141preproject.answers.entity.Answer;
import seb4141preproject.answers.repository.AnswerRepository;
import seb4141preproject.members.entity.Member;
import seb4141preproject.questions.entity.Question;

import java.util.Optional;

/**
 * - Service 목업 데이터로 테스트 (H2 콘솔에서 데이터 삽입 후)
 * - 검증 기능 구현
 */

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public Answer createAnswer(Answer answer) {
        // Member, Question 연결 전 목업 데이터 사용 세팅
        Member member = new Member();
        member.setId(1L);

        Question question = new Question();
        question.setId(1L);

        answer.setMember(member);
        answer.setQuestion(question);

        // TODO: 존재하는 회원, 존재하는 질문 검증 필요 -> 지민님이 하신 auditable을 활용하면 verifiedMember 메소드는 없어도 될 것 같습니다.
//        verifiedMember(answer.getMember().getId());
//        verifiedQuestion(answer.getQuestion().getId());

        Answer savedAnswer = answerRepository.save(answer);

        return savedAnswer;
    }

    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        Optional.ofNullable(answer.getContent())
                .ifPresent(description -> findAnswer.setContent(description));

        return answerRepository.save(findAnswer);
    }

    public Answer findAnswer(long answerId) {
        return findVerifiedAnswer(answerId);
    }

    public Page<Answer> findAnswers(int page, int size, long questionId) {
        return answerRepository.findByQuestionId(questionId, PageRequest.of(page, size,
                Sort.by("answerId").descending()));
    }

    public void deleteAnswer(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);

        answerRepository.delete(findAnswer);
    }

    public Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer =
                answerRepository.findById(answerId);
        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->
                        new IllegalArgumentException("답변을 찾을 수 없습니다."));
        return findAnswer;
    }

//    public Member verifiedMember(long memberId) {
//        Optional<Member> optionalMember =
//                memberRepository.findById(memberId);
//        Member findMember =
//                optionalMember.orElseThrow(() ->
//                        new IllegalArgumentException("회원을 찾을 수 없습니다."));
//        return findMember;
//    }
//
//    public Question verifiedQuestion(long questionId) {
//        Optional<Question> optionalQuestion =
//                questionRepository.findById(questionId);
//        Question findQuestion =
//                optionalQuestion.orElseThrow(()->
//                        new IllegalArgumentException("질문을 찾을 수 없습니다."));
//        return findQuestion;
//    }
}

package seb4141preproject.answers.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;
import seb4141preproject.members.entity.Member;
import seb4141preproject.questions.entity.Question;
import seb4141preproject.utils.Auditable;

import javax.persistence.Entity;
import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

/**
 * H2로 테스트
 */


@Entity
@Getter
@Setter
public class Answer extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // 글자 수 지정
    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @Formula(
            "(select count(*) from answer_vote av where av.answer_id = id and av.vote_status = 1) - " +
            "(select count(*) from answer_vote av where av.answer_id = id and av.vote_status = 2)"
    )
    private long voteCount;

//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
}

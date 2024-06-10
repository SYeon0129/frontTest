package com.quest_exfo.backend.dto.response;

import com.quest_exfo.backend.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberResponseDTO {
    //    요청 -> 응답용DTO
    //    비밀번호 포함하지 않아서 보안 up
    private String email;
    private String name;

    @Builder
    public MemberResponseDTO(String email, String name){
        this.email=email;
        this.name=name;
    }

    // Entity -> DTO
    public static MemberResponseDTO fromEntity(Member member) {
        return MemberResponseDTO.builder()
                .email(member.getEmail())
                .name(member.getName())
                .build();
    }

}
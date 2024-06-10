package com.quest_exfo.backend.controller;

import com.quest_exfo.backend.dto.request.MemberLoginDTO;
import com.quest_exfo.backend.dto.request.MemberSignupDTO;
import com.quest_exfo.backend.dto.request.MemberUpdateDTO;
import com.quest_exfo.backend.dto.response.MemberResponseDTO;
import com.quest_exfo.backend.dto.response.MemberTokenDTO;
import com.quest_exfo.backend.entity.Member;
import com.quest_exfo.backend.service.MemberServiceItf;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
//@RequestMapping("")
@RequiredArgsConstructor
public class MemberController {

    private final MemberServiceItf memberServiceItf;
    @GetMapping("/test")
    public String testEndpoint() {
        return "Hello from /test endpoint!";
    }
    @GetMapping("/checkEmail")
    public ResponseEntity<?> checkEmailDuplicate(@RequestParam String email){
        memberServiceItf.checkEmailDuplicate(email);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDTO> signup(@RequestBody MemberSignupDTO memberSignupDTO){
        MemberResponseDTO successSignup = memberServiceItf.signup(memberSignupDTO);
        System.out.println("회원가입 성공");
        return ResponseEntity.status(HttpStatus.CREATED).body(successSignup);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
    @PostMapping("/login")
    public ResponseEntity<MemberTokenDTO> login(@RequestBody MemberLoginDTO memberLoginDTO){
        MemberTokenDTO loginToken = memberServiceItf.login(memberLoginDTO);
        System.out.println("로그인 성공");
        return ResponseEntity.status(HttpStatus.OK).header(loginToken.getToken()).body(loginToken);
    }

    @PostMapping("/checkPassword")
    public ResponseEntity<MemberResponseDTO> checkPwd(@AuthenticationPrincipal Member member, @RequestBody Map<String, String> request){
        String password = request.get("password");
        MemberResponseDTO memberCurrent = memberServiceItf.check(member, password);
        return ResponseEntity.status(HttpStatus.OK).body(memberCurrent);
    }

    @PostMapping("/update")
    public ResponseEntity<MemberResponseDTO> update(@AuthenticationPrincipal Member member, @RequestBody MemberUpdateDTO memberUpdateDTO){
        MemberResponseDTO memberUpdate = memberServiceItf.update(member,memberUpdateDTO);
        return ResponseEntity.status(HttpStatus.OK).body(memberUpdate);
    }


}
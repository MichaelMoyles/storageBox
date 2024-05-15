package storagebox.backend.authentication;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SignInController {

	// @Bean
    // public BCryptPasswordEncoder bCryptPasswordEncoder() {
    //     return new BCryptPasswordEncoder();
    // }

	@GetMapping("/signin")
	public String signIn() {
		System.out.println("Sign In");
		return "Greetings from Spring Boot!";
	}

	@PostMapping("/signup")
	public String SignUp(@RequestBody SignUpRequest signUpRequest) {
        System.out.println(signUpRequest.getUsername());
		System.out.println(signUpRequest.getPassword());
		return "Success!";

    }

}
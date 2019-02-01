package ch.paranor.angular7template.backend;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	@GetMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
	UsersPage getUsersPage() {
		List<User> users = new ArrayList<User>();
		users.add(new User(1, "Cale", "Bogden", "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"));
		users.add(new User(2, "Joseph", "Stein", "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"));
		users.add(new User(3, "Oleg", "Pogodaev", "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"));
		
		return new UsersPage(users);
	}
}

package ch.paranor.angular7template.backend;

import java.util.List;

public class UsersPage {
	List<User> data;
	
	public UsersPage(List<User> data) {
		super();
		this.data = data;
	}

	public List<User> getData() {
		return data;
	}
}

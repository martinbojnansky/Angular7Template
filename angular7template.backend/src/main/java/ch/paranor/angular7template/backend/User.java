package ch.paranor.angular7template.backend;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
	Integer id;
	@JsonProperty(value = "first_name")
	String firstName;
	@JsonProperty(value = "last_name")
	String lastName;
	String avatar;
	
	public User(Integer id, String firstName, String lastName, String avatar) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.avatar = avatar;
	}

	public Integer getId() {
		return id;
	}
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getAvatar() {
		return avatar;
	}
}

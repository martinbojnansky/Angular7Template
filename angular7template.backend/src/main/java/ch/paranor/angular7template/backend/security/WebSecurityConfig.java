package ch.paranor.angular7template.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Override
	@Bean
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

	@Override
	@Bean
	protected UserDetailsService userDetailsService() {
		return super.userDetailsService();
	}

	protected JWTProperties jwtProperties() {
		return new JWTProperties();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("user").password(passwordEncoder().encode("password")).roles("USER");
		auth.inMemoryAuthentication().withUser("editor").password(passwordEncoder().encode("password")).roles("EDITOR");
		auth.inMemoryAuthentication().withUser("reviewer").password(passwordEncoder().encode("password")).roles("REVIEWER");
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			// Entry points
			.authorizeRequests()
			// Authorize all API calls
			.antMatchers("/api/**").authenticated().and()
			// Set JWT authentication and authorization
			.addFilter(new JWTAuthenticationFilter(authenticationManager(), jwtProperties()))
			.addFilter(new JWTAuthorizationFilter(authenticationManager(), jwtProperties()))
			// Disable creating Spring Security session
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			// Handle exceptions
			.exceptionHandling()
			.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)) // Return 401 instead of 403
			.and()
			// Disable CSRF (cross site request forgery) protection because header cookies are not used
			.csrf().disable();
	}
}

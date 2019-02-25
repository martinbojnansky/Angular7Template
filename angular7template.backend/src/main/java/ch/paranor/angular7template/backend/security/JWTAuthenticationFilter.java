package ch.paranor.angular7template.backend.security;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private AuthenticationManager authenticationManager;
	private JWTProperties jwtProperties;

	public JWTAuthenticationFilter(AuthenticationManager authenticationManager, JWTProperties jwtProperties) {
		this.authenticationManager = authenticationManager;
		this.jwtProperties = jwtProperties;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		return authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getParameter(SPRING_SECURITY_FORM_USERNAME_KEY),
						request.getParameter(SPRING_SECURITY_FORM_PASSWORD_KEY), new ArrayList<>()));
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		String token = Jwts.builder().setSubject(request.getParameter(SPRING_SECURITY_FORM_USERNAME_KEY))
				.setExpiration(new Date(System.currentTimeMillis() + jwtProperties.EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, jwtProperties.SECRET).compact();

		response.setContentType(MediaType.TEXT_PLAIN_VALUE);

		Writer w = new OutputStreamWriter(response.getOutputStream());
		w.append(token);
		w.flush();
	}
}

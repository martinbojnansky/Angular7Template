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

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private static final String JWT_SECRET = "asdfsa";
	private static final long JWT_EXPIRATION_TIME = 360000;
	private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    /**
     * attemptAuthentication: where we parse the user's credentials and issue them to the AuthenticationManager
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        return authenticationManager.authenticate(
		        new UsernamePasswordAuthenticationToken(
		                request.getParameter("username"),
		                request.getParameter("password"),
		                new ArrayList<>()
		        )
		);
    }

    /**
     * successfulAuthentication: which is the method called when a user successfully logs in.
     * We use this method to generate a JWT for this user.
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        String token = Jwts.builder().setSubject(request.getParameter("username"))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
        response.addHeader("Content-Type", "text/plain;charset=UTF-8");
        Writer w = new OutputStreamWriter(response.getOutputStream());
        w.append(token);
        w.flush();
    }

}

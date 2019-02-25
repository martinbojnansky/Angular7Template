package ch.paranor.angular7template.backend.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.authentication.www.NonceExpiredException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
	private JWTProperties jwtProperties;
	
	public JWTAuthorizationFilter(AuthenticationManager authenticationManager, JWTProperties jwtProperties) {
		super(authenticationManager);
		this.jwtProperties = jwtProperties;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		UsernamePasswordAuthenticationToken authentication = getAuthentication(request);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		chain.doFilter(request, response);
	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = resolveToken(request);
		
		if (token == null || !validateToken(token)) {
			return null;
		}

		String user = Jwts.parser()
				.setSigningKey(jwtProperties.SECRET)
				.parseClaimsJws(token)
				.getBody()
				.getSubject();

		if (user != null) {
			return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
		}

		return null;
	}

	protected String resolveToken(HttpServletRequest req) {
		String bearerToken = req.getHeader(HttpHeaders.AUTHORIZATION);
		
		if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}
		
		return null;
	}

	protected boolean validateToken(String token) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(jwtProperties.SECRET).parseClaimsJws(token);			
			claims.getBody().getExpiration().before(new Date());
			return true;
		} catch (MalformedJwtException | UnsupportedJwtException | SignatureException | IllegalArgumentException e) {
			// Invalid token
			return false;
		} catch (ExpiredJwtException e) {
			// Token expired
			return false;
		}
	}
}

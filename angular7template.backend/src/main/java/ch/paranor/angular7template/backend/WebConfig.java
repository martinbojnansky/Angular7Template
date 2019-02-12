package ch.paranor.angular7template.backend;

import java.io.IOException;


import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;


@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
    	.addResourceHandler("/**/*")
	    .addResourceLocations("classpath:/static/")
	    .resourceChain(true)
	    .addResolver(new PathResourceResolver() {
	      @Override
	      protected Resource getResource(String resourcePath, Resource location) throws IOException {
	        Resource requestedResource = location.createRelative(resourcePath);
	        return requestedResource.exists() && requestedResource.isReadable() ? requestedResource
	            : getResource("/index.html", location);
	      }
	    });
  }
  
  
  @Override
  public void addCorsMappings(CorsRegistry registry) {
      registry.addMapping("/**")
              .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");
  }
}
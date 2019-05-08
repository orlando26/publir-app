package com.publir.publirws;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.tomcat.util.codec.binary.Base64;
import org.apache.tomcat.util.codec.binary.StringUtils;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;


@RestController
public class UploadController {
	public static String UPLOAD_DIRECTORY = System.getProperty("user.dir")+"/target/classes/static/images";
	
	private String base64Img = "";

  public String getBase64Img() {
		return base64Img;
	}

	public void setBase64Img(String base64Img) {
		this.base64Img = base64Img;
	}

@CrossOrigin
  @PostMapping("/upload")
  public boolean pictureupload(@RequestParam("file") MultipartFile file) {

    System.out.println(file.getName());
    System.out.println(file.getOriginalFilename());
    System.out.println(file.getSize());

    try {
      Path downloadedFile = Paths.get(UPLOAD_DIRECTORY, "img");
      Files.deleteIfExists(downloadedFile);
      StringBuilder sb = new StringBuilder();
      sb.append("data:image/png;base64,");
      sb.append(StringUtils.newStringUtf8(Base64.encodeBase64(file.getBytes(), false)));
      setBase64Img(sb.toString());
      Files.copy(file.getInputStream(), downloadedFile);
      return true;
    }
    catch (IOException e) {
      LoggerFactory.getLogger(this.getClass()).error("pictureupload", e);
      return false;
    }

  }
  
  @GetMapping("/home")
	public ModelAndView home() {
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("template1");
		return modelAndView;
	}
  
  @CrossOrigin
  @GetMapping("/test")
  public String test() {
	  return "working...";
  }
  
  @CrossOrigin
  @GetMapping("/getImg")
  public String getImg() {
	  return getBase64Img();
  }
  
}
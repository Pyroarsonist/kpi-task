package kpi.is.kpitask.controller;

import kpi.is.kpitask.dao.entity.User;
import kpi.is.kpitask.domain.UserService;
import kpi.is.kpitask.dto.RequestUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(produces = "application/json")
    @RequestMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody RequestUserDto user) {
        try {
            userService.createUser(user.getName(), user.getPassword());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(produces = "application/json")
    @RequestMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody RequestUserDto user) {
        try {
            User foundedUser = userService.findUserByName(user.getName());
            return new ResponseEntity<>(foundedUser.getName(), HttpStatus.OK);
            //todo: add session
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}

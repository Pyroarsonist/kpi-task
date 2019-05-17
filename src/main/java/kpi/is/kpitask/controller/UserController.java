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

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(produces = "application/json")
    @RequestMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody RequestUserDto user, HttpSession session) {
        try {
            Optional<User> foundedUser = userService.findUserByName(user.getName());
            if (foundedUser.isPresent())
                throw new Error("User with this name already exists");
            User createdUser = userService.createUser(user.getName(), user.getPassword());
            session.setAttribute("userId", createdUser.getId());
            return new ResponseEntity<>(createdUser.getName(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(produces = "application/json")
    @RequestMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody RequestUserDto userDTO, HttpSession session) {
        try {
            Optional<User> foundedUser = userService.findUserByNameAndPassword(userDTO.getName(), userDTO.getPassword());
            if (foundedUser.isEmpty())
                throw new Error("No such user");
            User user = foundedUser.get();
            session.setAttribute("userId", user.getId());
            return new ResponseEntity<>(user.getName(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> destroySession(HttpSession session) {
        session.invalidate();
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

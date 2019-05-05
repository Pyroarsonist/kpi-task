package kpi.is.kpitask.domain;

import kpi.is.kpitask.dao.UserRepository;
import kpi.is.kpitask.dao.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(String name, String password) {
        User user = new User(name, password);
        userRepository.save(user);
        return user;
    }


    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserByName(String name) {
        return userRepository.findByName(name);
    }

    public Optional<User> findUserByNameAndPassword(String name, String password) {
        return userRepository.findUserByNameAndPassword(name, password);
    }

    public Optional<User> findUserById(Long userId) {
        return userRepository.findById(userId);
    }
}

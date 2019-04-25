package kpi.is.kpitask.domain;

import kpi.is.kpitask.dao.UserRepository;
import kpi.is.kpitask.dao.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void createUser(String name, String password) {
        User user = new User(name, password);
        userRepository.save(user);
    }


    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findUserByName(String name) {
        return userRepository.findByName(name);
    }
}

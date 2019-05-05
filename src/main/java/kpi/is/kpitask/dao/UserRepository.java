package kpi.is.kpitask.dao;

import kpi.is.kpitask.dao.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByName(String name);

    Optional<User> findUserByNameAndPassword(String name, String password);
}

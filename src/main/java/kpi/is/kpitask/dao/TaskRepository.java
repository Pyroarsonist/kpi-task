package kpi.is.kpitask.dao;

import kpi.is.kpitask.dao.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {


    @Query(value = "SELECT * FROM task t WHERE t.user_id=?1 ORDER BY (CASE \n" +
            "    WHEN t.importance='vital' THEN 1 \n" +
            "    WHEN t.importance='important' THEN 2\n" +
            "    WHEN t.importance='standard' THEN 3\n" +
            "    ELSE 4\n" +
            "END), deadline ASC;", nativeQuery = true)
    Iterable<Task> findByUser(Long userId);

    @Query(value = "SELECT * FROM task t WHERE t.user_id=?1 and t.completed=?2 ORDER BY (CASE \n" +
            "    WHEN t.importance='vital' THEN 1 \n" +
            "    WHEN t.importance='important' THEN 2\n" +
            "    WHEN t.importance='standard' THEN 3\n" +
            "    ELSE 4\n" +
            "END), deadline ASC;", nativeQuery = true)
    Iterable<Task> findByUserAndCompletedOrderByImportance(Long userId, Boolean completed);


    Optional<Task> findById(Long id);
}

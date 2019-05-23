package kpi.is.kpitask.dao;

import kpi.is.kpitask.dao.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {


    @Query(value = "SELECT * FROM task t " +
            "WHERE t.user_id=?1 AND t.completed_at IS NULL AND (t.title ILIKE ?2 OR t.description ILIKE ?2)" +
            " ORDER BY (CASE \n" +
            "    WHEN t.importance='vital' THEN 1 \n" +
            "    WHEN t.importance='important' THEN 2\n" +
            "    WHEN t.importance='standard' THEN 3\n" +
            "    ELSE 4\n" +
            "END), deadline ASC;", nativeQuery = true)
    Iterable<Task> findByUserOrderByImportance(Long userId, String search);

    @Query(value = "SELECT * FROM task t " +
            "WHERE t.user_id=?1 and t.completed_at IS NOT NULL AND (t.title ILIKE ?2 OR t.description ILIKE ?2)" +
            "ORDER BY completed_at DESC,(CASE \n" +
            "    WHEN t.importance='vital' THEN 1 \n" +
            "    WHEN t.importance='important' THEN 2\n" +
            "    WHEN t.importance='standard' THEN 3\n" +
            "    ELSE 4\n" +
            "END), deadline ASC;", nativeQuery = true)
    Iterable<Task> findTasksByUserAndCompletedAtIsNotNullAtOrderByCompletedAtDesc(Long userId, String search);


    Optional<Task> findById(Long id);
}

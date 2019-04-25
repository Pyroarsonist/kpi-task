package kpi.is.kpitask.dao;

import kpi.is.kpitask.dao.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Date;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Iterable<Task> findByUserIdAndCompletedAndDeadline(Long userId, Boolean completed, Date deadline);
    Optional<Task> findById(Long id);
}

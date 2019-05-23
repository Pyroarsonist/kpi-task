package kpi.is.kpitask.domain;

import kpi.is.kpitask.dao.TaskRepository;
import kpi.is.kpitask.dao.entity.Task;
import kpi.is.kpitask.dao.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;


@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Iterable<Task> getTasks(User user, Boolean completed, String search) {
        String searchString = search == null ? "%%" : "%" + search + "%";
        if (!completed)
            return taskRepository.findByUserOrderByImportance(user.getId(), searchString);
        return taskRepository.findTasksByUserAndCompletedAtIsNotNullAtOrderByCompletedAtDesc(user.getId(), searchString);
    }


    public Long createTask(User user, String title, String description, Date deadline, String importance) {
        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setDeadline(deadline);
        task.setImportance(importance);
        task.setUser(user);
        task = taskRepository.save(task);
        taskRepository.flush();
        return task.getId();
    }

    public Long editTask(User user, Long id, String title, String description, Timestamp deadline, String importance, Timestamp completedAt) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isEmpty()) throw new Error("Task not found");
        Task task = optionalTask.get();
        if (!user.getId().equals(task.getUser().getId()))
            throw new Error("Access denied");
        if (title != null)
            task.setTitle(title);
        if (description != null)
            task.setDescription(description);
        if (deadline != null)
            task.setDeadline(deadline);
        if (importance != null)
            task.setImportance(importance);
        if (completedAt != null)
            task.setCompletedAt(completedAt);
        task = taskRepository.save(task);
        taskRepository.flush();
        return task.getId();
    }

    public void deleteTask(User user, Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isEmpty()) throw new Error("Task not found");
        Task task = optionalTask.get();
        if (!user.getId().equals(task.getUser().getId()))
            throw new Error("Access denied");
        taskRepository.deleteById(id);
    }
}

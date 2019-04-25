package kpi.is.kpitask.domain;

import kpi.is.kpitask.dao.TaskRepository;
import kpi.is.kpitask.dao.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;


@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    //    todo: add ordered tasks
    public Iterable<Task> getTasks() {
        return taskRepository.findByUserIdAndCompletedAndDeadline(null, null, null);
    }


    //    todo: add creation of task with user id
    public Long createTask(String title, String description, Date deadline, String importance) {
        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setDeadline(deadline);
        task.setImportance(importance);
        task = taskRepository.save(task);
        taskRepository.flush();
        return task.getId();
    }

    //    todo: add edit of task with user id
    public Long editTask(Long id, String title, String description, Timestamp deadline, String importance) {
//        Optional<Task> task = taskRepository.findById(id);
        return 1L;
//        task.setTitle(title);
//        task.setDescription(description);
//        task.setDeadline(deadline);
//        task.setImportance(importance);
//        task = taskRepository.save(task);
//        taskRepository.flush();
//        return task.getId();
    }

}

package kpi.is.kpitask.controller;

import kpi.is.kpitask.dao.entity.Task;
import kpi.is.kpitask.domain.TaskService;
import kpi.is.kpitask.dto.RequestTaskDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.Objects;

@RestController
@RequestMapping("tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping()
    public @ResponseBody
    Iterable<Task> getTasks() {
        return taskService.getTasks();
    }

    @PostMapping()
    public @ResponseBody
    String createTask(@RequestBody String title, @RequestBody String description, @RequestBody Date deadline, @RequestBody String importance) {
        final Long id = taskService.createTask(title, description, deadline, importance);
        if (Objects.isNull(id)) {
            return "Something went wrong. Can't create task " + title;
        } else {
            return "Created task [" + title + "] with id = " + id;
        }
    }

    @PostMapping(produces = "application/json")
    public ResponseEntity<?> editTask(@Valid @RequestBody RequestTaskDto task) {
        try {
            taskService.editTask(task.getUserId(), task.getTitle(), task.getDescription(), task.getDeadline(), task.getImportance());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}

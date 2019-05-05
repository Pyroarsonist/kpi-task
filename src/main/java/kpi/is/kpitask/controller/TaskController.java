package kpi.is.kpitask.controller;

import kpi.is.kpitask.dao.entity.Task;
import kpi.is.kpitask.dao.entity.User;
import kpi.is.kpitask.domain.TaskService;
import kpi.is.kpitask.domain.UserService;
import kpi.is.kpitask.dto.RequestTaskDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;


    @GetMapping
    @RequestMapping("/all")
    public @ResponseBody
    Iterable<Task> getTasks() {
        return taskService.getTasks();
    }

    @PostMapping(produces = "application/json")
    @RequestMapping("/create")
    public @ResponseBody
    String createTask(@Valid @RequestBody RequestTaskDto task, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) return "User id not given";
        Optional<User> user = userService.findUserById(userId);
        if (user.isEmpty())
            return "This user cannot be found";
        final Long id = taskService.createTask(user.get(), task.getTitle(), task.getDescription(), task.getDeadline(), task.getImportance());
        if (Objects.isNull(id)) {
            return "Something went wrong. Can't create task " + task.getTitle();
        } else {
            return "Created task [" + task.getTitle() + "] with id = " + id;
        }
    }

    @PostMapping(produces = "application/json")
    @RequestMapping("/edit")
    public ResponseEntity<?> editTask(@Valid @RequestBody RequestTaskDto task) {
        try {
            taskService.editTask(1L, task.getTitle(), task.getDescription(), task.getDeadline(), task.getImportance());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}

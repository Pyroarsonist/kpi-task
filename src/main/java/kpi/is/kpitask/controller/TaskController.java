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
import java.util.Optional;

@RestController
@RequestMapping("tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;


    @GetMapping
    @RequestMapping("/")
    public @ResponseBody
    Iterable<Task> getTasks(HttpSession session) {
        User user = getUser(session.getAttribute("userId"));
        return taskService.getTasks(user, false);
    }


    @GetMapping
    @RequestMapping("/archive")
    public @ResponseBody
    Iterable<Task> getArchivedTasks(HttpSession session) {
        User user = getUser(session.getAttribute("userId"));
        return taskService.getTasks(user, true);
    }

    private User getUser(Object id) {
        if (id == null) throw new Error("User id not given");
        Long userId = Long.parseLong(id.toString());
        Optional<User> user = userService.findUserById(userId);
        if (user.isEmpty())
            throw new Error("This user cannot be found");
        return user.get();
    }

    @PostMapping(produces = "application/json")
    @RequestMapping("/create")
    public @ResponseBody
    ResponseEntity<?> createTask(@Valid @RequestBody RequestTaskDto task, HttpSession session) {
        try {
            User user = getUser(session.getAttribute("userId"));
            final Long id = taskService.createTask(user, task.getTitle(), task.getDescription(), task.getDeadline(), task.getImportance());
            return new ResponseEntity<>("Created task [" + task.getTitle() + "] with id = " + id, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(produces = "application/json")
    @RequestMapping("/edit")
    public ResponseEntity<?> editTask(@Valid @RequestBody RequestTaskDto task, HttpSession session) {
        try {
            User user = getUser(session.getAttribute("userId"));
            Long id = taskService.editTask(user, task.getId(), task.getTitle(), task.getDescription(), task.getDeadline(), task.getImportance(), task.getCompleted());
            return new ResponseEntity<>("Edited task #" + id, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}

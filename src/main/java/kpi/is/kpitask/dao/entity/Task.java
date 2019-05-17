package kpi.is.kpitask.dao.entity;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255)
    private String title;

    @Column(length = 1024)
    private String description;

    private Timestamp createdAt;

    private Timestamp updatedAt;

    private Timestamp deadline;

    /**
     * Could be standard, important, vital
     **/
    @Column(length = 32)
    private String importance;

    @Column
    @NotNull
    @ColumnDefault(value = "false")
    private Boolean completed;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Task() {
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        Date currentDate = new java.util.Date();
        this.createdAt = new Timestamp(currentDate.getTime());
        this.updatedAt = new Timestamp(currentDate.getTime());
    }

    @PreUpdate
    protected void onUpdate() {
        Date currentDate = new java.util.Date();
        this.updatedAt = new Timestamp(currentDate.getTime());
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = new Timestamp(deadline.getTime());
    }

    public String getImportance() {
        return importance;
    }

    public void setImportance(String importance) {
        this.importance = importance;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}

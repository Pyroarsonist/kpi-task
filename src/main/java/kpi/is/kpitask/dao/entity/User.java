package kpi.is.kpitask.dao.entity;


import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String password;

    private Timestamp createdAt;


    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private Collection<Task> tasks;

    public User() {
    }

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }

    @PrePersist
    protected void onCreate() {
        Date currentDate = new java.util.Date();
        this.createdAt = new Timestamp(currentDate.getTime());
    }

    public Long getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String toString() {
        return "User<" + id + "," + name + ">";
    }
}

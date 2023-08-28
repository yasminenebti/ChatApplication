package com.chat.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;
import java.util.List;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String picture;

    private boolean isGroup;
    @ManyToOne(fetch = FetchType.LAZY)
    private User createdBy;
    @ManyToMany
    @JsonIgnore
    private Set<User> admins = new HashSet<>();
    @ManyToMany
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "chat" , cascade = CascadeType.ALL)
    private List<Message> messages = new ArrayList<>();
}

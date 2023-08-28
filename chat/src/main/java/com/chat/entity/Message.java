package com.chat.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private LocalDateTime timeStamps;
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;
    @ManyToOne
    @JoinColumn(name = "chat" , referencedColumnName = "id")
    private Chat chat;

}

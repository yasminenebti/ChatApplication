package com.chat.token;

import com.chat.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    private LocalDateTime createdAt;

    private boolean expired;
    private boolean revoked;

    @ManyToOne
    @JoinColumn(name="userId")
    private User user;
}

package com.chat.email;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

public interface EmailSender {
    void sendEmail(String receiver,
                   String email,
                   String subject) throws MessagingException;
}

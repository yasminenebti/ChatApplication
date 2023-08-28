package com.chat.dto.message;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Builder
public class MessageResponse {
    private Long id;
    private String content;
    private LocalDateTime timeStamps;
    private Long userSender;

    private Long chatId;
}

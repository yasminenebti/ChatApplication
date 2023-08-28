package com.chat.dto.message;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SendRequest {
    private Long userId;
    private Long chatId;
    private String message;
}

package com.chat.dto.chat;

import lombok.*;

import java.util.List;
import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatResponse {

    private Long id;
    private String name;
    private String picture;

    private boolean isGroup;
    private Long createdByUserId;
    private Set<Long> adminsIds;
    private List<String> usersChat;
    private List<String> usersChatImages;
    private List<Long> messageIds;


}

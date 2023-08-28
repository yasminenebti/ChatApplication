package com.chat.controller;

import com.chat.dto.chat.ChatGroupRequest;
import com.chat.entity.Chat;
import com.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/new/{requestId}/{userId}")
    public ResponseEntity<?> createChat(
            @PathVariable("requestId") Long requestId ,
            @PathVariable("userId") Long userId) throws Exception {
        return ResponseEntity.ok(chatService.createChat(requestId,userId));
    }

    @PostMapping("/group/{userId}")
    public ResponseEntity<?> createGroup(
            @RequestBody ChatGroupRequest request ,
            @PathVariable Long userId){
        return ResponseEntity.ok(chatService.createGroup(request,userId));
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<?> getChat(@PathVariable("chatId") Long chatId){
        return ResponseEntity.ok(chatService.findChatById(chatId));
    }

    @GetMapping("/userChat/{userId}")
    public ResponseEntity<?> getChatByUser(@PathVariable("userId") Long userId){
        return ResponseEntity.ok(chatService.findChatsByUser(userId));
    }

    @PutMapping ("/{chatId}/add/{userId}")
    public ResponseEntity<?> addUserToChat(@PathVariable("chatId") Long chatId,@PathVariable("userId") Long userId,@RequestBody Long adminId){
        return ResponseEntity.ok(chatService.addUserToGroup(userId,chatId,adminId));
    }

    @PutMapping ("/{chatId}/remove/{userId}")
    public ResponseEntity<?> RemoveUserFromChat(@PathVariable("chatId") Long chatId,@PathVariable("userId") Long userId,@RequestBody Long adminId){
        return ResponseEntity.ok(chatService.removeFromGroup(userId,chatId,adminId));
    }
    @DeleteMapping("/{chatId}")
    public void deleteChat(@PathVariable("chatId") Long chatId) throws Exception {
        chatService.deleteChat(chatId);
    }

}

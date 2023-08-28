package com.chat.controller;

import com.chat.dto.message.SendRequest;
import com.chat.entity.Message;
import com.chat.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/message")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping("/new")
    public ResponseEntity<?> createMessage(
            @RequestBody SendRequest request){
        return ResponseEntity.ok(messageService.sendMessage(request));
    }

    @GetMapping("/chat/{chatId}")
    public ResponseEntity<?> getChat(@PathVariable("chatId") Long chatId){
        return ResponseEntity.ok(messageService.getChatMessage(chatId));
    }

    @GetMapping("/message/{messageId}")
    public ResponseEntity<?> getMessage(@PathVariable("messageId") Long messageId){
        return ResponseEntity.ok(messageService.findMessageById(messageId));
    }
}

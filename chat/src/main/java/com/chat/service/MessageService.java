package com.chat.service;

import com.chat.dto.message.MessageResponse;
import com.chat.dto.message.SendRequest;
import com.chat.entity.Chat;
import com.chat.entity.Message;
import com.chat.entity.User;
import com.chat.reposiroty.MessageRepository;
import com.chat.reposiroty.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ChatService chatService;

    public MessageResponse sendMessage(SendRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException(" user not found"));
        Chat chat = chatService.findChatById(request.getChatId()).orElseThrow(() -> new RuntimeException("Chat not found"));

        Message message = Message
                .builder()
                .content(request.getMessage())
                .timeStamps(LocalDateTime.now())
                .user(user)
                .chat(chat)
                .build();

        Message createdMessage = messageRepository.save(message);
        return mapToMessageDto(createdMessage);

    }

    private MessageResponse mapToMessageDto(Message message) {
        return MessageResponse
                .builder()
                .id(message.getId())
                .userSender(message.getUser().getId())
                .chatId(message.getChat().getId())
                .content(message.getContent())
                .timeStamps(message.getTimeStamps())
                .build();
    }

    public List<MessageResponse> getChatMessage(Long chatId){
        // User = userRepository.findById(userId).orElseThrow(() -> new RuntimeException(" user not found"));
        //if (chat.getUsers().contains(user)){}
        List<Message> messages = messageRepository.findByChat(chatId);
        return messages.stream().map(this::mapToMessageDto).collect(Collectors.toList());
        //else throw new RuntimeException("You are not member of this chat.");
    }

    public Optional<Message> findMessageById(Long chatId) {
        return messageRepository.findById(chatId);
    }
}

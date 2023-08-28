package com.chat.service;

import com.chat.dto.chat.ChatGroupRequest;
import com.chat.dto.chat.ChatResponse;
import com.chat.entity.Chat;
import com.chat.entity.User;
import com.chat.reposiroty.ChatRepository;
import com.chat.reposiroty.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    public String createChat(Long reqUserId , Long userId) throws Exception {
        User requestingUser = userRepository.findById(reqUserId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        Chat isExist = chatRepository.findSingleChatByIds(user,requestingUser);

        if (isExist == null){
            Chat chat = Chat.builder()
                    .isGroup(false)
                    .createdBy(requestingUser)
                    .users(Set.of(requestingUser, user))
                    .build();

            if (chat.getAdmins() == null) {
                chat.setAdmins(new HashSet<>());
            }
            chat.getAdmins().add(requestingUser);
            chatRepository.save(chat);
            return "new chat created";
        }
        else return " chat already created";

    }


    public Optional<Chat> findChatById(Long chatId) {
        return chatRepository.findById(chatId);
    }

    public List<ChatResponse> findChatsByUser(Long userId) {
         List<Chat> chats = chatRepository.findChatByUserId(userId);
         return chats.stream().map(this::mapToChatDto).collect(Collectors.toList());

    }

    public ChatResponse createGroup(ChatGroupRequest request , Long userId){
        User requestingUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Set<User> groupUsers = request.getUsersId().stream()
                .map(userGroup -> userRepository.findById(userGroup).orElseThrow(() -> new RuntimeException("User not found")))
                .collect(Collectors.toSet());

        Chat groupChat = Chat.builder()
                .name(request.getName())
                .picture(request.getPicture())
                .isGroup(true)
                .createdBy(requestingUser)
                .users(groupUsers)
                .build();
        if (groupChat.getPicture() == null) {
            groupChat.setPicture("https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_1280.png");
        }
        groupChat.setAdmins(new HashSet<>());
        groupChat.getAdmins().add(requestingUser);
        Chat chatGroup = chatRepository.save(groupChat);
        return mapToChatDto(chatGroup);

    }

    public Chat addUserToGroup(Long userId, Long chatId , Long adminId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        User admin = userRepository.findById(adminId).orElseThrow(() -> new RuntimeException("User not found"));

        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found"));

        if(chat.getAdmins().contains(admin)) {
            chat.getUsers().add(user);
        }
        return chatRepository.save(chat);
    }

    public Chat renameGroup(Long chatId, String newName) {
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found"));
        chat.setName(newName);
        return chatRepository.save(chat);
    }

    public Chat removeFromGroup(Long userId, Long chatId , Long adminId) {
        User removingUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        User admin = userRepository.findById(adminId).orElseThrow(() -> new RuntimeException("User not found"));
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found"));
        if(chat.getAdmins().contains(admin)) {
            chat.getUsers().remove(removingUser);
            return chatRepository.save(chat);
        } else if (userId.equals(adminId)) {
            chat.getUsers().remove(removingUser);
            return chatRepository.save(chat);
        }
        else {
            throw new RuntimeException("You are not allowed to");
        }
    }


    public void deleteChat(Long chatId) throws Exception {
        boolean exists = chatRepository.existsById(chatId);
        if (!exists) {
            throw  new Exception(String.format("Category with ID %s not found",chatId));
        }
        chatRepository.deleteById(chatId);
    }

    private ChatResponse mapToChatDto(Chat chat) {
        return ChatResponse
                .builder()
                .id(chat.getId())
                .name(chat.getName())
                .picture(chat.getPicture())
                .isGroup(chat.isGroup())
                .createdByUserId(chat.getCreatedBy().getId())
                .adminsIds(chat.getAdmins().stream().map(User::getId).collect(Collectors.toSet()))
                .usersChat(chat.getUsers().stream().map(user -> user.getFirstName() + " " + user.getLastName() ).collect(Collectors.toList()))
                .usersChatImages(chat.getUsers().stream().map(User::getPicture).collect(Collectors.toList()))
                .build();
    }
}


package com.chat.reposiroty;

import com.chat.entity.Chat;
import com.chat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat,Long> {

    @Query("select c from Chat c join c.users u where u.id =:userId")
    public List<Chat> findChatByUserId(@Param("userId") Long userId);
    @Query("SELECT c FROM Chat c WHERE c.isGroup = false AND :user MEMBER OF c.users AND :reqUser MEMBER OF c.users")
    public Chat findSingleChatByIds(@Param("user") User user, @Param("reqUser") User userReq);

}

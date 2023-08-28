package com.chat.reposiroty;

import com.chat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    @Query("SELECT u from User u where " +
            "LOWER(u.firstName)  LIKE %:name% OR " +
            "LOWER(u.lastName) LIKE %:name% OR " +
            "LOWER(u.email) LIKE %:name%")
    List<User> searchUsers(@Param("name") String name);

    /*@Query("SELECT u from User u where " +
            "MATCH(u.firstName, u.lastName, u.username, u.email) AGAINST(:name IN BOOLEAN MODE)")*/
}

package com.quest_exfo.backend.service;

import com.quest_exfo.backend.controller.NotificationController;
import com.quest_exfo.backend.entity.Booth;
import com.quest_exfo.backend.entity.Like;
import com.quest_exfo.backend.repository.BoothRepository;
import com.quest_exfo.backend.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.LocalTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private BoothRepository boothRepository;

    private final long THIRTY_MINUTES_IN_MILLIS = 30 * 60 * 1000; // 30 minutes in milliseconds

    public void notifyUsersForBoothStartingIn30Minutes() {
        // Calculate the time 30 minutes from now
        LocalTime now = LocalTime.now();
        LocalTime thirtyMinutesLater = now.plusMinutes(30);

        // Find booths starting in 30 minutes
        List<Booth> boothsStartingIn30Minutes = boothRepository.findBoothsStartingIn30Minutes(thirtyMinutesLater);

        // Notify users who liked these booths
        for (Booth booth : boothsStartingIn30Minutes) {
            List<Like> likes = likeRepository.findByBooth(booth);
            for (Like like : likes) {
                sendNotificationToUser(like.getMember().getMember_id(), "부스가 곧 시작됩니다.");
            }
        }
    }

    private void sendNotificationToUser(Long userId, String message) {
        if (NotificationController.sseEmitters.containsKey(userId)) {
            SseEmitter sseEmitter = NotificationController.sseEmitters.get(userId);
            try {
                sseEmitter.send(SseEmitter.event().name("boothStartingSoon").data(message));
            } catch (Exception e) {
                NotificationController.sseEmitters.remove(userId);
            }
        }
    }
}

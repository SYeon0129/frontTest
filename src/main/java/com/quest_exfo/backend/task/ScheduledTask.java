package com.quest_exfo.backend.task;

import com.quest_exfo.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTask {

    @Autowired
    private NotificationService notificationService;

    // Run every minute
    @Scheduled(fixedRate = 60000)  // 60 seconds = 1 minute
    public void notifyUsersForBoothsStartingIn30Minutes() {
        notificationService.notifyUsersForBoothStartingIn30Minutes();
    }
}

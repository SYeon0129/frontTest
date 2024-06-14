package com.quest_exfo.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class NotificationController {

    // Map to store userId and corresponding SSE emitters
    public static Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    @GetMapping("/notifications")
    public SseEmitter openSseConnection(Long userId) throws IOException {
        SseEmitter sseEmitter = new SseEmitter();

        // Store the SSE emitter for this userId
        sseEmitters.put(userId, sseEmitter);

        // Remove the SSE emitter when the connection is closed
        sseEmitter.onCompletion(() -> sseEmitters.remove(userId));
        sseEmitter.onTimeout(() -> sseEmitters.remove(userId));

        return sseEmitter;
    }
}

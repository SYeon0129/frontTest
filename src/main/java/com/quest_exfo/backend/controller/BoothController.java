package com.quest_exfo.backend.controller;

import com.quest_exfo.backend.common.BoothCategory;
import com.quest_exfo.backend.common.BoothType;
import com.quest_exfo.backend.common.ResourceNotFoundException;
import com.quest_exfo.backend.dto.request.BoothDTO;
import com.quest_exfo.backend.entity.Booth;
import com.quest_exfo.backend.repository.BoothRepository;
import com.quest_exfo.backend.service.booth.BoothService;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/api/booths")
public class BoothController {

  @Autowired
  private BoothService boothService;

  @Autowired
  private BoothRepository boothRepository;

  @PostMapping("/insert")
  public Booth createBooth(
          @RequestPart("booth") BoothDTO boothDTO,
          @RequestPart("file") MultipartFile file) throws IOException {
    return boothService.createBooth(boothDTO, file);
  }

  @GetMapping("/get")
  public Page<Booth> getBooths(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int size,
          @RequestParam(required = false) BoothCategory category,
          @RequestParam(required = false) BoothType type) {
    Pageable pageable = PageRequest.of(page, size);
    if (category != null && type != null) {
      return boothRepository.findByCategoryAndTypeOrderByDateDesc(category, type, pageable);
    } else if (category != null) {
      return boothRepository.findByCategoryOrderByDateDesc(category, pageable);
    } else if (type != null) {
      return boothRepository.findByTypeOrderByDateDesc(type, pageable);
    } else {
      return boothRepository.findAll(pageable);
    }
  }

  @GetMapping("/get/{id}")
  public BoothDTO getBoothById(@PathVariable Long id) {
    Booth booth = boothRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Booth not found"));
    System.out.println("Fetched Booth: " + booth);
    return convertToDTO(booth);
  }

  @GetMapping("/getRoomId/{boothId}")
  public ResponseEntity<Integer> getRoomId(@PathVariable Long boothId) {
    Booth booth = boothService.findBoothById(boothId);
    if (booth != null && booth.getVideoRoomId() != null) {
      return ResponseEntity.ok(booth.getVideoRoomId());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  private BoothDTO convertToDTO(Booth booth) {
    BoothDTO boothDTO = new BoothDTO();
    boothDTO.setBoothId(booth.getBoothId());
    boothDTO.setTitle(booth.getTitle());
    boothDTO.setInfo(booth.getInfo());
    boothDTO.setCategory(booth.getCategory());
    boothDTO.setDate(booth.getDate());
    boothDTO.setStartTime(booth.getStartTime());
    boothDTO.setEndTime(booth.getEndTime());
    boothDTO.setImgPath(booth.getImgPath());
    boothDTO.setMaxPeople(booth.getMaxPeople());
    boothDTO.setOpenerName(booth.getOpenerName());
    boothDTO.setType(booth.getType());
    boothDTO.setVideoRoomId(booth.getVideoRoomId());
    boothDTO.setMemberId(booth.getMemberId());
    System.out.println("Converted BoothDTO: " + boothDTO);
    return boothDTO;
  }
}
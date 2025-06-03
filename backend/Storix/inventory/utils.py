import cv2
from pyzbar import pyzbar


def analyze_video_fast(video_path: str, pairs: list) -> dict:
    FRAME_SKIP = 2
    RESIZE_SCALE = 0.5

    cap = cv2.VideoCapture(video_path)
    frame_idx = 0

    seen_boxes = set()
    seen_racks = set()
    matched_pairs = set()
    total_pairs = set((p["box"], p["rack"]) for p in pairs)

    current_locations = {}

    last_seen_rack = None

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_idx += 1
        if frame_idx % FRAME_SKIP != 0:
            continue

        if RESIZE_SCALE != 1.0:
            frame = cv2.resize(frame, (0, 0),
                               fx=RESIZE_SCALE, fy=RESIZE_SCALE)

        decoded = pyzbar.decode(frame)
        frame_boxes = set()
        frame_racks = set()

        for obj in decoded:
            data = obj.data.decode('utf-8')
            if data.startswith("BOX:"):
                code = data.split("BOX:")[1]
                frame_boxes.add(code)
                seen_boxes.add(code)
            elif data.startswith("RACK:"):
                code = data.split("RACK:")[1]
                frame_racks.add(code)
                seen_racks.add(code)

        if frame_racks:
            last_seen_rack = next(iter(frame_racks))

        for b in frame_boxes:
            if last_seen_rack is not None:
                current_locations[b] = last_seen_rack

        for b, r in total_pairs:
            if b in frame_boxes and r in frame_racks:
                matched_pairs.add((b, r))

        if matched_pairs == total_pairs:
            break

    cap.release()

    result_list = []
    all_ok = True
    for b, r in total_pairs:
        matched = (b, r) in matched_pairs
        if not matched:
            all_ok = False

        result_list.append({
            "box": b,

            "current_location": current_locations.get(b),
            "rack": r,
            "box_найден": b in seen_boxes,
            "rack_найден": r in seen_racks,
            "одновременное_наличие": matched
        })

    return {
        "статус": "готово",
        "пары": result_list,
        "все_пары_совпали": all_ok
    }

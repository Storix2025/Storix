import pytest
from inventory.utils import analyze_video_fast

class DummyCap:
    def __init__(self, frames):
        self.frames = frames
        self.idx = 0
    def read(self):
        if self.idx < len(self.frames):
            f = self.frames[self.idx]; self.idx +=1
            return True, f
        return False, None
    def release(self):
        pass

def dummy_decode_none(frame):
    return []

def test_analyze_video_fast_empty(monkeypatch, tmp_path):

    res = analyze_video_fast(str(tmp_path/"nofile.mp4"), [])
    assert res["все_пары_совпали"]
    assert res["пары"] == []

def test_analyze_video_fast_with_dummy(monkeypatch):

    import cv2, inventory.utils
    frames = [b'fake_frame']*3
    monkeypatch.setattr(inventory.utils, 'cv2',
        type('cv2mod',(object,),{'VideoCapture':lambda path: DummyCap(frames), 'resize': lambda *args,**k: args[0]})
    )
    from pyzbar import pyzbar
    monkeypatch.setattr(pyzbar, 'decode', dummy_decode_none)
    result = analyze_video_fast("ignored", [{"box":"B","rack":"R"}])
    # не найдено ни коробок ни стеллажей
    assert result["пары"][0]["box_найден"] is False
    assert result["пары"][0]["rack_найден"] is False
    assert result["все_пары_совпали"] is False

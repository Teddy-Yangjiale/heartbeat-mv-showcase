"""生成公开网址的二维码。用法: python generate_qr.py https://your-site.vercel.app"""
import sys
import segno

def main():
    if len(sys.argv) < 2:
        print("用法: python generate_qr.py <网址>")
        sys.exit(1)
    url = sys.argv[1]
    qr = segno.make(url, error="h")  # 高纠错，便于打印/远距离扫码
    # 高清 PNG（缩放大、留白足）
    qr.save("qr.png", scale=12, border=4, dark="#0a0a0f", light="#ffffff")
    print(f"已生成 qr.png -> {url}")

if __name__ == "__main__":
    main()

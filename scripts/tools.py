import platform
import subprocess

def get_distro():
    """
    Name of your Linux distro (in lowercase).
    """
    OS = platform.system()
    if OS == "Linux":
        with open("/etc/issue") as f:
            return f.read().lower().split()[0]
    else:
        return OS


def get_gpu():
    """
    Name of your GPU.
    """
    
    # read output of command "glxinfo | grep -i "Device"
    # and return the first word
    cmd = "glxinfo | grep -i 'Device'"
    return subprocess.getoutput(cmd).split()[1]

def have_nvidia():
    """
    Check if you have an nvidia GPU.
    """
    cmd = "lspci | grep -i nvidia"
    return subprocess.getoutput(cmd) != ""
    
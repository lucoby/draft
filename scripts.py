import subprocess


def dev_start():
    subprocess.run(["uvicorn", "draft.main:app", "--reload"])

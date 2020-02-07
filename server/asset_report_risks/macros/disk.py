import re
import tarfile
import zipfile
from invisibleroads_macros_disk import (
    make_folder)
from os import remove
from os.path import dirname, exists, expanduser
from shutil import move, rmtree

from ..exceptions import BadArchive, BadFormat


TEMPORARY_FOLDER = expanduser('~/.tmp')
_MINIMUM_UNIQUE_LENGTH = 10


def move_path(target_path, source_path):
    # Adapted from invisibleroads-macros
    prepare_path(target_path)
    move(source_path, target_path)
    return target_path


def remove_safely(folder_or_path):
    # Adapted from invisibleroads-macros
    try:
        rmtree(folder_or_path)
    except OSError:
        try:
            remove(folder_or_path)
        except OSError:
            pass
    return folder_or_path


def prepare_path(path):
    # Adapted from invisibleroads-macros
    make_folder(dirname(remove_safely(path)))
    return path


def uncompress(source_path, target_folder=None):
    # Adapted from invisibleroads-macros
    if not exists(source_path):
        raise IOError('file not found (%s)' % source_path)
    if source_path.endswith('.tar.gz') or source_path.endswith('.tar.xz'):
        compression_format = 'xz' if source_path.endswith('.xz') else 'gz'
        try:
            source_file = tarfile.open(source_path, 'r:' + compression_format)
        except tarfile.ReadError:
            raise BadArchive('archive unreadable (%s)' % source_path)
        extension_expression = r'\.tar\.%s$' % compression_format
    elif source_path.endswith('.zip'):
        try:
            source_file = zipfile.ZipFile(source_path, 'r')
        except zipfile.BadZipfile:
            raise BadArchive('archive unreadable (%s)' % source_path)
        extension_expression = r'\.zip$'
    else:
        raise BadFormat('compression format not supported (%s)' % source_path)
    default_target_folder = re.sub(extension_expression, '', source_path)
    target_folder = target_folder or default_target_folder
    source_file.extractall(target_folder)
    source_file.close()
    return target_folder

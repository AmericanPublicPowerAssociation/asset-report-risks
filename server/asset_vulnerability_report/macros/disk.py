import re
import tarfile
import zipfile
from asset_tracker.macros.security import make_random_string
from os import makedirs, remove
from os.path import dirname, exists, expanduser
from shutil import move, rmtree
from tempfile import mkdtemp

from ..exceptions import BadArchive, BadFormat


TEMPORARY_FOLDER = expanduser('~/.tmp')
_MINIMUM_UNIQUE_LENGTH = 10


class TemporaryStorage(object):
    # Adapted from invisibleroads-macros

    def __init__(self, parent_folder=None, suffix='', prefix=''):
        if parent_folder is None:
            parent_folder = make_folder(TEMPORARY_FOLDER)
        self.folder = make_unique_folder(parent_folder, suffix, prefix)

    def __enter__(self):
        return self

    def __exit__(self, exception_type, exception_value, exception_traceback):
        remove_safely(self.folder)


def make_unique_folder(
        parent_folder=None, suffix='', prefix='',
        length=_MINIMUM_UNIQUE_LENGTH):
    # Adapted from invisibleroads-macros
    if parent_folder:
        make_folder(parent_folder)
    suffix = _prepare_suffix(suffix, length)
    return mkdtemp(suffix, prefix, parent_folder)


def make_folder(folder):
    # Adapted from invisibleroads-macros
    try:
        makedirs(folder)
    except OSError:
        pass
    return folder


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


def _prepare_suffix(suffix, length):
    # Adapted from invisibleroads-macros
    if length < _MINIMUM_UNIQUE_LENGTH:
        raise ValueError(
            'length must be greater than %s' % _MINIMUM_UNIQUE_LENGTH)
    return make_random_string(length - _MINIMUM_UNIQUE_LENGTH) + suffix


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

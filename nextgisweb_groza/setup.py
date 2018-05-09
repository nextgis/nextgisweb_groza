from setuptools import setup, find_packages
import sys, os

version = '0.0'

requires = (
    'nextgisweb',
    'nextgisweb_basemap'
    'requests',
    'pyproj',
    'python-dateutil',
    'marshmallow'
)

entry_points = {
    'nextgisweb.packages': [
        'nextgisweb_groza = nextgisweb_groza:pkginfo',
    ],

    'nextgisweb.amd_packages': [
        'nextgisweb_groza = nextgisweb_groza:amd_packages',
    ],

}

setup(
    name='nextgisweb_groza',
    version=version,
    description="Nextgisweb Groza extension",
    long_description="",
    classifiers=[
        "Programming Language :: Python",
        "Framework :: Pylons",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
    ],
    author='NextGIS',
    author_email='info@nextgis.ru',
    url='https://github.com/nextgis/nextgisweb_groza',
    keywords='web pyramid nextgis GIS',
    license='',
    packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
    include_package_data=True,
    zip_safe=False,
    install_requires=requires,
    entry_points=entry_points,
)
